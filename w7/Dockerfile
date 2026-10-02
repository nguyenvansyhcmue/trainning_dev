FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY w5/w5.csproj w5/
COPY w7/w7.csproj w7/
RUN dotnet restore w7/w7.csproj
COPY w5/ w5/
COPY w7/ w7/
WORKDIR /src/w7
RUN dotnet publish w7.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "w7.dll"]
