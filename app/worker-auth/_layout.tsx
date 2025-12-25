import { Stack } from 'expo-router';

export default function WorkerAuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="kyc" />
      <Stack.Screen name="info" />
      <Stack.Screen name="quiz" />
    </Stack>
  );
}
