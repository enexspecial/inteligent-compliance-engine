FROM golang:1.21-alpine as builder
WORKDIR /app
COPY . .
RUN go mod tidy && go build -o file-service main.go

FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/file-service ./file-service
COPY --from=builder /app/.env ./.env
EXPOSE 8080
CMD ["./file-service"] 