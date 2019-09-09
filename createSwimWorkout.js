import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "swim_workout_table",
    Item: {
      username: data.username,
      workout_id: uuid.v1(),
      warmup: data.warmup,
      preset: data.preset,
      mainset: data.mainset,
      cooldown: data.cooldown,
      difficulty: data.difficulty,
      date_created: new Date().toLocaleString("en-US", {timeZone: "America/Chicago"}).toString(),
      yardage: data.yardage,
      likes: 0
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
