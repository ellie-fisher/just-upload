module.exports =
{
	port: 3000,

	uploadTimeout: 10000,

	limits:
	{
		fileListPage: 10,

		fileListMS: 20 * 1000,  // 20 seconds
		fileListPerMS: 10,  // Number of file list requests per `fileListMS` time

		uploadMS: 30 * 1000,  // 20 seconds
		uploadsPerMS: 3,  // Number of uploads per `uploadMS` time

		downloadMS: 20 * 1000,  // 20 seconds
		downloadsPerMS: 4,  // Number of downloads per `downloadMS` time

		deleteMS: 20 * 1000,  // 20 seconds
		deletesPerMS: 3,  // Number of deletions per `deleteMS` time
	},
};
