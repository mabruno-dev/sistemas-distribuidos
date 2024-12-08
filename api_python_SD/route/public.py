from datetime import datetime
from fastapi import APIRouter, Body, Header
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from db import Database
import functions as fn
import json
from models.products import GetProducts, SetProduct
from functions import errorFunction


class Public():
    def __init__(self) -> None:

        self.dictErrorResponse = {
            200: {"mensagem": "Sucesso!"},
            400: {"mensagem": "Erro na requisição!"},
            401: {"mensagem": "Não autorizado!"},
            403: {"mensagem": "Não autenticado!"},
            404: {"mensagem": "Não encontrado!"}
        }

        self.product_router = APIRouter(prefix='/public', tags=['Products'])

        self.product_router.add_api_route('/product',
                                          self.get_product,
                                          methods=['GET'],
                                          response_model=GetProducts,
                                          responses=self.dictErrorResponse)

        self.product_router.add_api_route('/product',
                                          self.post_product,
                                          methods=['POST'],
                                          response_model=SetProduct,
                                          responses=self.dictErrorResponse)

        self.product_router.add_api_route('/product',
                                          self.update_product,
                                          methods=['PUT'],
                                          responses=self.dictErrorResponse)

        self.product_router.add_api_route('/product',
                                          self.delete_product,
                                          methods=['DELETE'],
                                          responses=self.dictErrorResponse)

    async def get_product(self):
        try:
            with Database() as db:
                sql = """SELECT * FROM products"""

                result = db.query(sql)

                if len(result) == 0:
                    raise HTTPException(status_code=404)

                products = [{"id": row[0], "name": row[1], "price": float(row[2]), "description": row[3], "image": row[4]}
                            for row in result
                            ]

                return JSONResponse(content=products, status_code=200)
        except Exception as E:
            errorFunction(self, E)

    async def post_product(self, product: SetProduct = Body(...)):
        try:
            with Database() as db:
                sql = """INSERT INTO products (name, price, description, image) VALUES (%s, %s, %s, %s)"""
                db.execute(sql, (product.name, product.price,
                           product.description, product.image))
                db.commit()
                return JSONResponse(content=json.dumps({"mensagem": "Sucesso!"}), status_code=200)
        except Exception as E:
            errorFunction(self, E)

    async def update_product(self):
        pass

    async def delete_product(self):
        pass
