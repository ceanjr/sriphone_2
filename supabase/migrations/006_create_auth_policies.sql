-- Create RLS policies for categorias and produtos tables
-- Public can read, only authenticated admins can modify

-- ============================================
-- CATEGORIAS POLICIES
-- ============================================

-- Allow public read access to categorias (for catalog page)
CREATE POLICY "Public can view categorias"
  ON categorias
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated admins to insert categorias
CREATE POLICY "Admins can insert categorias"
  ON categorias
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Allow authenticated admins to update categorias
CREATE POLICY "Admins can update categorias"
  ON categorias
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Allow authenticated admins to delete categorias
CREATE POLICY "Admins can delete categorias"
  ON categorias
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================
-- PRODUTOS POLICIES
-- ============================================

-- Allow public read access to active produtos (for catalog page)
CREATE POLICY "Public can view active produtos"
  ON produtos
  FOR SELECT
  TO public
  USING (ativo = true);

-- Allow authenticated admins to view all produtos (including inactive)
CREATE POLICY "Admins can view all produtos"
  ON produtos
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Allow authenticated admins to insert produtos
CREATE POLICY "Admins can insert produtos"
  ON produtos
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Allow authenticated admins to update produtos
CREATE POLICY "Admins can update produtos"
  ON produtos
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Allow authenticated admins to delete produtos
CREATE POLICY "Admins can delete produtos"
  ON produtos
  FOR DELETE
  TO authenticated
  USING (is_admin());
