var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
function otpcreate(_a) {
    return __awaiter(this, arguments, void 0, function* ({ otp, userId }) {
        if (otp && userId) {
            try {
                const otpdb = yield prisma.otp.create({
                    data: {
                        otp,
                        userId,
                    },
                });
                return otpdb;
            }
            catch (e) {
                console.error(e);
            }
        }
    });
}
export default otpcreate;
