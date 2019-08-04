import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "user_table",
    Key: {
      username: data.username,
    },
    UpdateExpression: "SET liked_components = :liked_components, liked_workouts = :liked_workouts",
    ExpressionAttributeValues: {
      ":liked_components": data.liked_components,
      ":liked_workouts": data.liked_workouts
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
