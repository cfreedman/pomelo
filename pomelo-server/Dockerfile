FROM python:3.13

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY . /app

WORKDIR /app

RUN uv sync --frozen

ENV PATH="/app/.venv/bin:$PATH"

ENTRYPOINT []

# CMD ["flask", "--app", "app.py", "run", "--debug", "--host", "0.0.0.0"]