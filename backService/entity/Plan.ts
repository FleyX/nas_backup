export default class Plan {
    planId: number = 0;
    planName: string = "";
    description: string = "";
    //保留的历史份数,最小1
    holdHistory:number = 1;
    sourcePath: string = "";
    targetPath: string = "";
    nextLaunchTime: number = 0;
    lanuchInterval: number = 0;
    latestHistoryId: number = 0;
    ignoreList: Array<String> = [];
    latestHistoryDetail: Object | null = null;
}