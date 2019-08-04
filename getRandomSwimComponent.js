import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
    const params = {
      TableName: "swim_components_table",
      ProjectionExpression: "username, component_id"
    };

    const resultList = await dynamoDbLib.call("scan", params);
    let randomItemNumber = Math.floor(Math.random() * resultList.Items.length);
    let randomUsername = resultList.Items[randomItemNumber].username;
    let randomUUID = resultList.Items[randomItemNumber].component_id;

    const randomParams = {
        TableName: "swim_components_table",
        Key: {
            username: randomUsername,
            component_id: randomUUID
        }
    };

    const result = await dynamoDbLib.call("get", randomParams);
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
}