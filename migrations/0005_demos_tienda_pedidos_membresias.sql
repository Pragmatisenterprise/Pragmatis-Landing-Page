-- Agrega las plantillas Tienda, Pedidos y Membresías con sus demos estáticas (/demo/<carpeta>/).
-- Idempotente: si una plantilla ya existe (p. ej. creada desde /admin), solo se actualiza su demo_url;
-- no se tocan sus datos ni sus módulos.

-- Marcas auxiliares: una fila por plantilla que todavía no existe.
CREATE TABLE _m0005_nuevas (slug TEXT PRIMARY KEY);
INSERT INTO _m0005_nuevas (slug)
SELECT s.slug FROM (SELECT 'tienda' AS slug UNION ALL SELECT 'pedidos' UNION ALL SELECT 'membresias') s
WHERE NOT EXISTS (SELECT 1 FROM templates t WHERE t.slug = s.slug);

-- Tienda
INSERT INTO templates (slug, name, business, kind, summary, features, price_from, demo_url, published, sort_order)
SELECT 'tienda', 'Tienda', 'Tiendas, cafés y minimercados', 'web',
       'Vende en el local y en línea con el inventario y la caja al día.',
       '["Catálogo con stock","Pedidos con pago en línea","Caja diaria","Alertas de inventario"]',
       0, '/demo/tienda/', 1, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM templates)
WHERE EXISTS (SELECT 1 FROM _m0005_nuevas WHERE slug = 'tienda');

INSERT OR IGNORE INTO template_modules (template_id, module_id, included)
SELECT t.id, m.id, CASE WHEN m.slug IN ('fidelizacion') THEN 0 ELSE 1 END
FROM templates t JOIN modules m ON m.slug IN ('catalogo', 'inventario', 'caja', 'pagos', 'pedidos', 'reportes', 'fidelizacion')
WHERE t.slug = 'tienda' AND EXISTS (SELECT 1 FROM _m0005_nuevas WHERE slug = 'tienda');

-- Pedidos
INSERT INTO templates (slug, name, business, kind, summary, features, price_from, demo_url, published, sort_order)
SELECT 'pedidos', 'Pedidos', 'Restaurantes y comidas', 'web',
       'Tus clientes piden y pagan en línea, y siguen su pedido hasta recogerlo.',
       '["Menú en línea","Pago en línea","Seguimiento del pedido","Tarjeta de sellos"]',
       0, '/demo/pedidos/', 1, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM templates)
WHERE EXISTS (SELECT 1 FROM _m0005_nuevas WHERE slug = 'pedidos');

INSERT OR IGNORE INTO template_modules (template_id, module_id, included)
SELECT t.id, m.id, CASE WHEN m.slug IN ('inventario', 'caja') THEN 0 ELSE 1 END
FROM templates t JOIN modules m ON m.slug IN ('catalogo', 'pagos', 'pedidos', 'fidelizacion', 'reportes', 'inventario', 'caja')
WHERE t.slug = 'pedidos' AND EXISTS (SELECT 1 FROM _m0005_nuevas WHERE slug = 'pedidos');

-- Membresías
INSERT INTO templates (slug, name, business, kind, summary, features, price_from, demo_url, published, sort_order)
SELECT 'membresias', 'Membresías', 'Gimnasios y estudios', 'web',
       'Planes, reservas de clases y control de asistencia en un solo lugar.',
       '["Planes y renovaciones","Reserva de clases","Control de asistencia","Reportes"]',
       0, '/demo/membresias/', 1, (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM templates)
WHERE EXISTS (SELECT 1 FROM _m0005_nuevas WHERE slug = 'membresias');

INSERT OR IGNORE INTO template_modules (template_id, module_id, included)
SELECT t.id, m.id, CASE WHEN m.slug IN ('pagos', 'fidelizacion') THEN 0 ELSE 1 END
FROM templates t JOIN modules m ON m.slug IN ('catalogo', 'reservas', 'membresias', 'reportes', 'pagos', 'fidelizacion')
WHERE t.slug = 'membresias' AND EXISTS (SELECT 1 FROM _m0005_nuevas WHERE slug = 'membresias');

-- Si ya existían, solo se les pone la demo.
UPDATE templates SET demo_url = '/demo/tienda/' WHERE slug = 'tienda';
UPDATE templates SET demo_url = '/demo/pedidos/' WHERE slug = 'pedidos';
UPDATE templates SET demo_url = '/demo/membresias/' WHERE slug = 'membresias';

DROP TABLE _m0005_nuevas;
