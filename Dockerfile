FROM node:20-alpine AS builder

WORKDIR /data
ADD https://github.com/wwricu/blog-page/releases/latest/download/dist.tar.gz .
RUN tar -xzf dist.tar.gz && rm dist.tar.gz && npm ci

FROM node:20-alpine

WORKDIR /data

COPY --from=builder /data/.next ./.next
COPY --from=builder /data/node_modules ./node_modules
COPY --from=builder /data/package.json ./

# 启动应用
CMD ["npm", "run", "start"]
