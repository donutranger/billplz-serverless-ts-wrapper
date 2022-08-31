# README

Installation options: 
1. `npm install -g serverless`

Commands for deployment:
- dev: `npx serverless deploy --stage dev`
- prod: `npx serverless deploy --stage prod`

**Important**:<br />
Use `npx` at the beginning of the command so that the local project version of serverless is used.

## Endpoints
- **dev endpoint**: `https://sea68v01x9.execute-api.us-east-1.amazonaws.com`
- **prod endpoint**: `https://cituu4geo5.execute-api.us-east-1.amazonaws.com`

## API Usage

### `/getBill/{id}`
Method: `GET`<br />
Example: `https://sea68v01x9.execute-api.us-east-1.amazonaws.com/getBill/cdmntpfi`

### `/createBill`
Method: `POST`<br />
Example: `https://sea68v01x9.execute-api.us-east-1.amazonaws.com/createBill`<br />
Include in the body params:
```
{
	"email": "harishadi.dev@gmail.com",
	"mobile": "012345678",
	"name": "Pakalu Papito",
	"amount": 30000,
	"description": "test transaction from postman",
	"redirect_url": "http://localhost:3000/"
}
```

