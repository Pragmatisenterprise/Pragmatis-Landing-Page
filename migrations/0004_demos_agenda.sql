-- Corrige módulos y agrega la plantilla Agenda con su demo estática (/demo/agenda/).
-- Solo UPDATE e INSERT idempotentes: producción ya puede tener datos cargados desde /admin.

UPDATE modules SET summary = 'Carrito con pago en línea para recoger en el local.' WHERE slug = 'pedidos';
UPDATE modules SET summary = 'Planes con duración, renovación y aviso de vencimiento.' WHERE slug = 'membresias';
-- Quedan para más adelante (facturación irá por la API de un proveedor autorizado).
UPDATE modules SET published = 0 WHERE slug IN ('facturacion', 'fila-virtual');

-- Marca auxiliar: si la plantilla ya existía, solo se le actualiza demo_url (no se tocan sus datos ni sus módulos).
CREATE TABLE _m0004_nueva (x INTEGER);
INSERT INTO _m0004_nueva (x) SELECT 1 WHERE NOT EXISTS (SELECT 1 FROM templates WHERE slug = 'agenda');

INSERT INTO templates (slug, name, business, kind, summary, features, price_from, demo_url, published, sort_order)
SELECT 'agenda', 'Agenda', 'Barberías, salones y spas', 'web',
       'Tus clientes reservan en línea, dejan reseñas y acumulan sellos.',
       '["Reservas en línea","Catálogo de servicios","Reseñas","Tarjeta de sellos"]',
       0, '/demo/agenda/', 1, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM templates)
WHERE EXISTS (SELECT 1 FROM _m0004_nueva);

INSERT OR IGNORE INTO template_modules (template_id, module_id, included)
SELECT t.id, m.id, CASE WHEN m.slug IN ('pagos', 'reportes') THEN 0 ELSE 1 END
FROM templates t JOIN modules m ON m.slug IN ('catalogo', 'reservas', 'resenas', 'fidelizacion', 'pagos', 'reportes')
WHERE t.slug = 'agenda' AND EXISTS (SELECT 1 FROM _m0004_nueva);

UPDATE templates SET demo_url = '/demo/agenda/' WHERE slug = 'agenda';

DROP TABLE _m0004_nueva;
