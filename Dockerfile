FROM node:20.12.2-slim

WORKDIR /data
ADD https://github.com/wwricu/blog-page/releases/latest/download/dist.tar.gz .

RUN tar -xzf dist.tar.gz && rm dist.tar.gz \
&& ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' > /etc/timezone

CMD ["/bin/bash"]
