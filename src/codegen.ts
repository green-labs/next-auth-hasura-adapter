import dotenv from "dotenv"
import { CodegenConfig } from "@graphql-codegen/cli";

dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://hasura.farmmoa.farmmorning.dev/v1/graphql": {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
  documents: "src/queries/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        enumsAsTypes: true,
        constEnums: true,
      },
    },
  },
};

export default config;
