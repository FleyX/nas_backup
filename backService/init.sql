CREATE TABLE "plan" (
"planId" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"planName" TEXT NOT NULL,
"description" TEXT NOT NULL,
"sourcePath" TEXT NOT NULL,
"targetPath" TEXT NOT NULL,
"nextLaunchTime" INTEGER NOT NULL,
"launchInterval" INTEGER NOT NULL,
"latestHistoryId" INTEGER NOT NULL,
"ignoreList" TEXT NOT NULL
);
CREATE TABLE "history" (
"historyId" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
"planId" INTEGER NOT NULL,
"fileNum" INTEGER NOT NULL,
"fileSize" REAL NOT NULL,
"speed" REAL NOT NULL,
"startTime" INTEGER NOT NULL,
"endTime" INTEGER NOT NULL,
"comment" TEXT NOT NULL
);
