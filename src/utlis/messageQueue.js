const amqplib = require("amqplib");
const {
  EXCHANGE_NAME,
  REMINDER_BINDING_KEY,
  MESSAGE_BROKEN_URL,
} = require("../config/serverConfig");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKEN_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    throw error;
  }
};

const subscribeMessage = async (channel, service, binding_key) => {
  try {
    console.log(service);

    const applictationQueue = await channel.assertQueue("REMINDER_SERVICE");
    channel.bindQueue(applictationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applictationQueue.queue, (msg) => {
      // console.log("received Data");
      // console.log(msg.content.toString());
      const payload = JSON.parse(msg.content.toString());
      service(payload);
      channel.ack(msg);
    });
  } catch (error) {
    console.log("Error subscribing to message:", error);
    throw error;
  }
};

const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue("REMINDER_SERVICE");
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createChannel,
  subscribeMessage,
  publishMessage,
};
