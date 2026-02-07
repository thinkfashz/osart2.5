-- Función para reducir stock al confirmar pago
CREATE OR REPLACE FUNCTION reduce_product_stock()
RETURNS TRIGGER AS $$
BEGIN
  -- Solo reducir stock cuando el pago cambia de no confirmado a confirmado
  IF NEW.payment_status = 'confirmed' AND OLD.payment_status != 'confirmed' THEN
    -- Reducir stock de cada producto en order_items
    UPDATE products p
    SET stock = stock - oi.quantity
    FROM order_items oi
    WHERE oi.order_id = NEW.id
      AND p.id = oi.product_id;
      
    -- Registrar en historial
    INSERT INTO order_status_history (order_id, old_status, new_status, notes)
    VALUES (NEW.id, 'payment_pending', 'payment_confirmed', 'Stock reducido automáticamente');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para reducir stock
DROP TRIGGER IF EXISTS on_payment_confirmed ON orders;
CREATE TRIGGER on_payment_confirmed
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION reduce_product_stock();

-- Función para restaurar stock al cancelar orden
CREATE OR REPLACE FUNCTION restore_product_stock()
RETURNS TRIGGER AS $$
BEGIN
  -- Solo restaurar stock cuando la orden cambia a cancelada
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    -- Solo restaurar si el pago fue confirmado (stock ya fue reducido)
    IF OLD.payment_status = 'confirmed' THEN
      UPDATE products p
      SET stock = stock + oi.quantity
      FROM order_items oi
      WHERE oi.order_id = NEW.id
        AND p.id = oi.product_id;
        
      -- Registrar en historial
      INSERT INTO order_status_history (order_id, old_status, new_status, notes)
      VALUES (NEW.id, OLD.status, 'cancelled', 'Stock restaurado automáticamente');
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para restaurar stock
DROP TRIGGER IF EXISTS on_order_cancelled ON orders;
CREATE TRIGGER on_order_cancelled
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION restore_product_stock();

-- Comentarios para documentación
COMMENT ON FUNCTION reduce_product_stock() IS 'Reduce automáticamente el stock de productos cuando se confirma el pago de una orden';
COMMENT ON FUNCTION restore_product_stock() IS 'Restaura automáticamente el stock de productos cuando se cancela una orden que tenía pago confirmado';
