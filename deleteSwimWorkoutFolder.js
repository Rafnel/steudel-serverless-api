import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "swim_workout_folders",
    Key: {
        "owner_username": data.owner_username,
        "folder_name": data.folder_name
    }
  };

  try {
    await dynamoDbLib.call("delete", params);
    return success(params.Key);
  } catch (e) {
    return failure({ status: false });
  }
}
