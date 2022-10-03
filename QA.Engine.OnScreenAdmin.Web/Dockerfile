FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
LABEL stage=intermediate

RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash - && \
    apt-get install -y nodejs

WORKDIR /src
COPY ["QA.Engine.OnScreenAdmin.Web/QA.Engine.OnScreenAdmin.Web.csproj", "QA.Engine.OnScreenAdmin.Web/"]
COPY nuget.config .
RUN dotnet restore "QA.Engine.OnScreenAdmin.Web/QA.Engine.OnScreenAdmin.Web.csproj"

WORKDIR /src/QA.Engine.OnScreenAdmin.Web
COPY QA.Engine.OnScreenAdmin.Web/package.json .
COPY QA.Engine.OnScreenAdmin.Web/package-lock.json .
RUN npm ci

WORKDIR /src
COPY . .

WORKDIR /src/QA.Engine.OnScreenAdmin.Web
RUN dotnet publish "QA.Engine.OnScreenAdmin.Web.csproj" -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
ARG SERVICE_VERSION=0.0.0
ENV ServiceVersion=${SERVICE_VERSION}
WORKDIR /app
COPY --from=build-env /app/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "QA.Engine.OnScreenAdmin.Web.dll"]
