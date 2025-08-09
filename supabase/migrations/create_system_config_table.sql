-- Create system_config table to store system configurations
CREATE TABLE IF NOT EXISTS public.system_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key VARCHAR(255) NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to anon and authenticated users
CREATE POLICY "Allow read access to system_config" ON public.system_config
  FOR SELECT USING (true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON public.system_config TO anon;
GRANT SELECT ON public.system_config TO authenticated;

-- Insert the Gemini API key configuration
-- Note: Replace 'YOUR_GEMINI_API_KEY_HERE' with your actual API key
INSERT INTO public.system_config (config_key, config_value)
VALUES ('gemini_api_key', 'YOUR_GEMINI_API_KEY_HERE')
ON CONFLICT (config_key) DO UPDATE SET
  config_value = EXCLUDED.config_value,
  updated_at = NOW();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_system_config_updated_at
  BEFORE UPDATE ON public.system_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();