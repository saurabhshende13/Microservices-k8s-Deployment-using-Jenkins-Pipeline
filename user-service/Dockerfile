FROM python:3.9
WORKDIR /app
COPY user-service.py .
RUN pip install flask flask_cors
CMD ["python", "user-service.py"]
