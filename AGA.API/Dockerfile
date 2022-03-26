#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

RUN apt-get update \
    && apt-get install -y curl \
    && apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs


WORKDIR /src
COPY ["AGA.API/AGA.API.csproj", "AGA.API/"]
COPY ["AGA.API.DependencyInjectionExtensions/AGA.API.DependencyInjectionExtensions.csproj", "AGA.API.DependencyInjectionExtensions/"]
COPY ["AGA.Application.csproj", "AGA.Application/"]
COPY ["AGA.Application.Contracts/AGA.Application.Contracts.csproj", "AGA.Application.Contracts/"]
COPY ["AGA.Domain/AGA.Domain.csproj", "AGA.Domain/"]
COPY ["AGA.Domain.Shared/AGA.Domain.Shared.csproj", "AGA.Domain.Shared/"]
COPY ["AGA.Hubs/AGA.Hubs.csproj", "AGA.Hubs/"]
COPY ["AGA.Infrastructure/AGA.Infrastructure.csproj", "AGA.Infrastructure/"]
COPY ["AGA.Repository.EFCore/AGA.Repository.EFCore.csproj", "AGA.Repository.EFCore/"]
COPY ["AGA.Repository.InMomery/AGA.Repository.InMomery.csproj", "AGA.Repository.InMomery/"]
RUN dotnet restore "AGA.API/AGA.API.csproj"

COPY . .
WORKDIR "/src/AGA.API"
RUN dotnet build "AGA.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AGA.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AGA.API.dll"]