from uvicorn import run

if __name__ == '__main__':
    run('api:app',
        host='0.0.0.0',  
        port=5000,
        reload=True,
        log_level='info',
        use_colors=False,)
