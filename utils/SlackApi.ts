import { WebClient } from "@slack/web-api";

class Slack {
  private static web = new WebClient(process.env.SLACK_TOKEN);

  private constructor() {}

  static async postMessage({
    channelId,
    text,
    ts,
  }: {
    channelId: string;
    text: string;
    ts?: string;
  }): Promise<void> {
    await this.web.chat.postMessage({
      channel: channelId,
      text,
      thread_ts: ts,
    });
  }

  static async getMessages({
    channelId,
    oldestTimestamp,
  }: {
    channelId: string;
    oldestTimestamp: string;
  }): Promise<any> {
    const result = await this.web.conversations.history({
      channel: channelId,
      oldest: oldestTimestamp,
    });
    return result.messages;
  }
}

export default Slack;
