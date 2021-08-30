const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /leads/{email}":
        await dynamo
          .delete({
            TableName: "corebiz-leads",
            Key: {
              email: event.pathParameters.email
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.email}`;
        break;

      case "GET /leads/{email}":
        body = await dynamo
          .get({
            TableName: "corebiz-leads",
            Key: {
              email: event.pathParameters.email
            }
          })
          .promise();
        break;

      case "GET /leads":
        body = await dynamo.scan({ TableName: "corebiz-leads" }).promise();
        break;

      case "POST /leads":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "corebiz-leads",
            Item: {
              name: requestJSON.name,
              email: requestJSON.email,
              phone: requestJSON.phone,
              formOrigin: requestJSON.formOrigin,
              dateLead: requestJSON.dateLead,
              dateClient: requestJSON.dateClient
            }
          })
          .promise();
        body = `Post item ${requestJSON.email}`;
        break;

        case "PUT /leads/{email}":
        let requestJSON2 = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "corebiz-leads",
            Item: {
              name: requestJSON2.name,
              email: event.pathParameters.email,
              phone: requestJSON2.phone,
              formOrigin: requestJSON2.formOrigin,
              dateLead: requestJSON2.dateLead,
              dateClient: requestJSON2.dateClient
            }
          })
          .promise();
        body = `Put item ${event.pathParameters.email}`;
        break;
        
        case "PATCH /leads/{email}":
        let requestJSON3 = JSON.parse(event.body);
        await dynamo
          .update({
            TableName: "corebiz-leads",
            Key: {
            email: event.pathParameters.email
        },
        UpdateExpression: "SET dateClient = :setDateClient",
        ExpressionAttributeValues: {
        ":setDateClient": requestJSON3.dateClient
          }
          })
          .promise();
        body = `Patch item ${event.pathParameters.email}`;
        
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};