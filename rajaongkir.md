DKI JAKARTA: 10
JAKARTA PUSAT: 137
JOHOR BARU: 1342
TANAH TINGGI: 17608

curl --location 'https://rajaongkir.komerce.id/api/v1/calculate/district/domestic-cost' \
--header 'key: YOUR_API_KEY' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'origin=1342' \
--data-urlencode 'destination=2626' \
--data-urlencode 'weight=1000' \
--data-urlencode 'courier=jne:sicepat:ide:sap:jnt:ninja:tiki:lion:anteraja:pos:ncs:rex:rpx:sentral:star:wahana:dse' \
--data-urlencode 'price=lowest'
