FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY api/*.csproj ./api/

RUN dotnet restore ./api/api.csproj

COPY . .

RUN dotnet publish ./api/api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080 
ENTRYPOINT ["dotnet", "api.dll"]
