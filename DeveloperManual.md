# Developer Manual

First of all thanks for contributing and making omni more powerful.

## Project structure?

To minimize the work of other devs and also to make th process more efficient and systematic, i have developed a internal framework to be used in omni.

This framework consists of the following main files:

1. `/src/handlers/fileHandlers.js`
2. `/src/rules/[app-type].json`
 <!-- 3. `/templates/[app-type]/optional/_scripts.js` -->

The \_index.json files explains how the destination files be updated for each feature a user opts for.

## How to write the `_index.json` file?

The basic structure of a `_index.json` file is:

```json
{
	"files": {
		"required": [
			{
				"src": "userController.js",
				"des": "/controllers"
			},
			{
				"src": "authController.js",
				"des": "/controllers"
			}
		],
		"deletes": [
			{
				"file": "/routes/userRoutes.js"
			}
		],
		"updates:": [
			{
				"des": "app.js",
				"src": "_srcipts.js",
				"strict": false,
				"flags": [
					{
						"start": "%USE ROUTES% ->>",
						"end": "<<-- %USE ROUTES%"
					}
				],
				"lines": [
					"\napp.use('/api/v1/user/', userRouter); // <- Calling the user router",
					"\napp.use('/api/v1/auth/', authRouter); // <- Calling the auth router"
				]
			},
			{
				"des": "app.js"
			}
		]
	},
	"dir": {
		"new": [],
		"deletes": ["/routes/authRouter"]
	}
}
```

### Lets review all the properties

1. **required**: This stores all the files necessary for this feaature.

    - src and des: their usual meaning

2. **deletes**: All the files that should not be present(for whatever reason) in the destinaiton folder.

    - files: The file address to be deleted

3. **updates**: (_the most important prop_) This property contains all the changes to be made in the exisiting file for this feature. Lets review the sub-props :
    - des: distination dir
    - src (_optional_): the file from where the code is to extracted from. This code should be large enough that it cannot be fit into one line. Generaly a file called `_scripts.js` can be made to contain all additional codes for all files.
    - flags: A pair of code (generally comments) using which the framework checks if a particular fucntions is added or not.
    - strict: A Boolean, that tells the framework, if it should overwrite exsiting code inbetween flags or just add to the end of it.
    - lines (_recommended_): Use in case the updates are single line and creating seperate flags seems like a waste to time. This way is faster than the **src**, but is very inconvinient when it comes to bigger changes.
