import { rest } from "msw";
// JSON 파일을 불러온다.
import sick from "./dummy.json";

export const handlers = [
    rest.get("/sick", async (req, res, ctx) => {
        const queryParams = req.url.searchParams;
        // 추출하려는 문자열을 지정한다.
        const qParam = queryParams.get("q");

        const filteredObjects = sick.sick.filter((object) => {
            if (qParam) {
                // Value가 특정 문자열을 포함하는지 확인한다.
                return object.sickNm.includes(qParam);
            }
          });

        return res(ctx.status(200), ctx.json(filteredObjects));
    }),
];