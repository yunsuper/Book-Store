import { requestHandler } from "./http";

import type { Banner } from "../models/banner.model";

export const fetchBanners = async () => {
    return await requestHandler<Banner[]>("get", "/banners");
};
