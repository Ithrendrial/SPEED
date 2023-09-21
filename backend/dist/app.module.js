"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const article_module_1 = require("./article/article.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            article_module_1.ArticleModule,
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: () => ({
                    uri: 'mongodb+srv://matcris81:Lewandowski9@cluster0.d1cz2ne.mongodb.net/?retryWrites=true&w=majority',
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map