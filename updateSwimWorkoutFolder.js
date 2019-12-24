import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//add or remove a workout from a folder.
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "swim_workout_folders",
    Key: {
      owner_username: data.owner_username,
      folder_name: data.folder_name
    },
    UpdateExpression: "SET workouts = :workouts",
    ExpressionAttributeValues: {
      ":workouts": data.workouts
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
