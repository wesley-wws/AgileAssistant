#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

RUN apt-get update \
    && apt-get install -y curl \
    && apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs


WORKDIR /src
COPY ["AgileAssistant.Web/AgileAssistant.Web.csproj", "AgileAssistant.Web/"]
COPY ["AgileAssistant.Hubs/AgileAssistant.Hubs.csproj", "AgileAssistant.Hubs/"]
COPY ["AgileAssistant.Meeting/AgileAssistant.Meeting.csproj", "AgileAssistant.Meeting/"]
RUN dotnet restore "AgileAssistant.Web/AgileAssistant.Web.csproj"

COPY . .
WORKDIR "/src/AgileAssistant.Web"
RUN dotnet build "AgileAssistant.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AgileAssistant.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AgileAssistant.Web.dll"]