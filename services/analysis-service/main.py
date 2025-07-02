from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse

app = FastAPI(title="Compliance Analysis Service")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
def analyze_document(file: UploadFile = File(...)):
    # Placeholder for LangChain analysis logic
    # content = await file.read()
    # result = analyze_with_langchain(content)
    return JSONResponse({"message": "Document received for analysis", "filename": file.filename}) 