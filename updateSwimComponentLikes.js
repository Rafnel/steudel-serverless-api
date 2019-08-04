import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "swim_components_table",
    Key: {
      username: data.username,
      component_id: data.component_id
    },
    UpdateExpression: "SET likes = likes + :num",
    ExpressionAttributeValues: {
      ":num": data.value
    },
    ReturnValues: "NONE"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
