export default class Plan {
    planId: Number = 0;
    planName: String = "";
    description: String = "";
    sourcePath: String = "";
    targetPath: String = "";
    nextLaunchTime: Number = 0;
    lanuchInterval: Number = 0;
    latestHistoryId: Number = 0;
    ignoreList: Array<String> = [];
    latestHistoryDetail: Object | null = null;
}