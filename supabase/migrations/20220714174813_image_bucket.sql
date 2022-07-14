insert into storage.buckets (id, name, public)
values ('image', 'image', true);

CREATE POLICY "public 1nq2cb_0" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'image');
CREATE POLICY "public 1nq2cb_1" ON storage.objects FOR SELECT TO public USING (bucket_id = 'image');
CREATE POLICY "public 1nq2cb_2" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'image');
CREATE POLICY "public 1nq2cb_3" ON storage.objects FOR DELETE TO public USING (bucket_id = 'image');
