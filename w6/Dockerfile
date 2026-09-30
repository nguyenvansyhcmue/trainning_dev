# Build stage: restore, compile and publish the API.
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY w5/w5.csproj w5/
RUN dotnet restore w5/w5.csproj

COPY w5/ w5/
WORKDIR /src/w5
RUN dotnet publish w5.csproj -c Release -o /app/publish --no-restore

# Runtime stage: contains only the files needed to run the API.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "w5.dll"]
