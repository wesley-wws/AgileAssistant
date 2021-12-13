#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["PlaningPoker.Web/PlaningPoker.Web.csproj", "PlaningPoker.Web/"]
COPY ["PlaningPoker.Hubs/PlaningPoker.Hubs.csproj", "PlaningPoker.Hubs/"]
COPY ["PlaningPoker.Meeting/PlaningPoker.Meeting.csproj", "PlaningPoker.Meeting/"]
RUN dotnet restore "PlaningPoker.Web/PlaningPoker.Web.csproj"
COPY . .
WORKDIR "/src/PlaningPoker.Web"
RUN dotnet build "PlaningPoker.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PlaningPoker.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PlaningPoker.Web.dll"]