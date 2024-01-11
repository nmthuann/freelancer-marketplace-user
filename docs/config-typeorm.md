# Config TypeORM

[Text Link](https://typeorm.io/migrations#generating-migrations)

## file .src/datasource.ts

```Typescript
// Đoạn mã JavaScript
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/modules/**/!(*base).entity{.ts,.js}'],
    logging: false,
    synchronize: false,
    migrationsRun: false,
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
    migrationsTableName: "history",
});
```

## cli:

> TypeORM 0.3.6 doesn't have cli.migrationsDir property to specify path for migration:run #8964
> [Text Link](https://github.com/typeorm/typeorm/issues/8964)

```shell
yarn typeorm migration:create ./src/migration/PostRefactoring
```

Here, PostRefactoring is the name of the migration - you can specify any name you want. After you run the command you can see a new file generated in the "migration" directory named {TIMESTAMP}-PostRefactoring.ts where {TIMESTAMP} is the current timestamp when the migration was generated. Now you can open the file and add your migration sql queries there.

> You should see the following content inside your migration:

```Typescript
import { MigrationInterface, QueryRunner } from "typeorm"

export class PostRefactoringTIMESTAMP implements MigrationInterface {
   async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" RENAME COLUMN "title" TO "name"`,
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "post" RENAME COLUMN "name" TO "title"`,
        ) // reverts things made in "up" method
    }
}
```

## Running and reverting migrations

> typeorm migration:create and typeorm migration:generate will create .ts files, unless you use the o flag (see more in Generating migrations). The migration:run and migration:revert commands only work on .js files. Thus the typescript files need to be compiled before running the commands. Alternatively you can use ts-node in conjunction with typeorm to run .ts migration files.

1. Example with ts-node:

```shell
npx typeorm-ts-node-commonjs migration:run -- -d path-to-datasource-config
```

2. Example with ts-node in ESM projects:

```shell
npx typeorm-ts-node-esm migration:run -- -d path-to-datasource-config
```

3. for example: Generate

```shell
yarn typeorm-ts-node-commonjs migration:generate ./src/migrations -d ./src/data-source.ts
```

4. For example: Revert

```shell
yarn typeorm-ts-node-commonjs migration:revert ./src/migrations -d ./src/data-source.ts
```

### Lưu ý Phân biệt:

1. export abstract class
2. TableInheritance -> no abstract class

-   Xác định được ChildEntity()

```shell
    "seed:config": "ts-node ./node_modules/typeorm-seeding/dist/cli.js config -n src/config/typeorm.config-migrations.ts",
    "seed:run": "ts-node ./node_modules/typeorm-seeding/dist/cli.js seed -n src/config/typeorm.config-migrations.ts",
    "db:refresh": "yarn typeorm:cli schema:drop && yarn migration:run && yarn seed:run"
```

yarn typeorm-ts-node-commonjs migration:create ./src/database/migrations/RenameRolesTable
yarn typeorm-ts-node-commonjs migration:run -d ./src/database/datasource.ts
docker-compose run --rm freelancer-marketplace-user yarn typeorm-ts-node-commonjs migration:run -d ./src/database/datasource.ts
