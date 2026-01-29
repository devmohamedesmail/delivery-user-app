import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { AuthContext } from "@/context/auth-provider";
import Toast from "react-native-toast-message";
import AuthLayout from "@/components/screens/auth/auth-layout";
import colors from "@/constants/colors";
import Layout from "@/components/ui/layout";

export default function Login() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const { handle_login } = useContext(AuthContext);


  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: loginMethod === "email"
        ? Yup.string()
          .email(t("auth.email_invalid"))
          .required(t("auth.email_required"))
        : Yup.string(),
      phone: loginMethod === "phone"
        ? Yup.string()
          .matches(/^[0-9]{10,15}$/, t("auth.phone_invalid"))
          .required(t("auth.phone_required"))
        : Yup.string(),
      password: Yup.string()
        .required(t("password_required"))
        .min(6, t("password_min")),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const email = loginMethod === "email" ? values.email : null;
        const phone = loginMethod === "phone" ? values.phone : null;

        const result = await handle_login(email, phone, values.password);

        if (result.data.success) {
          Toast.show({
            text1: t("auth.login_success"),
            text2: t("auth.login_success_description"),
            position: "top",
            type: "success",
          });

          setIsLoading(false);

          setTimeout(() => {
            router.replace("/");
          }, 1000);
        } else {
          Toast.show({
            text1: t("auth.login_failed"),
            position: "top",
            type: "error",
          });
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        Toast.show({
          text1: t("auth.login_failed"),
          text2: t("auth.login_failed_description"),
          position: "top",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Layout>
      <AuthLayout>
        <View className="flex-1 px-6 -mt-4 pt-8 rounded-t-3xl" >
          <View className="space-y-4">
            {/* Login Method Toggle */}
            <View className="flex-row mb-4 bg-gray-100 rounded-xl p-1" >
              <TouchableOpacity
                onPress={() => setLoginMethod("email")}
                className="flex-1 py-3 rounded-lg items-center"
                style={{
                  backgroundColor: loginMethod === "email" ? colors.light.tint : "transparent",
                }}
              >
                <Text
                  className="font-bold"
                  style={{
                    color: loginMethod === "email" ? "#fff" : colors.light.text,
                  }}
                >
                  {t("auth.email")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLoginMethod("phone")}
                className="flex-1 py-3 rounded-lg items-center"
                style={{
                  backgroundColor: loginMethod === "phone" ? colors.light.tint : "transparent",
                }}
              >
                <Text
                  className="font-bold"
                  style={{
                    color: loginMethod === "phone" ? "#fff" : colors.light.text,
                  }}
                >
                  {t("auth.phone")}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Email/Phone Input */}
            {loginMethod === "email" ? (
              <Input
                label={t("auth.email")}
                placeholder={t("auth.enterEmail")}
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                type="email"
                keyboardType="email-address"
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : undefined
                }
              />
            ) : (
              <Input
                label={t("auth.phone")}
                placeholder={t("auth.enterPhone")}
                value={formik.values.phone}
                onChangeText={formik.handleChange("phone")}
                type="phone"
                keyboardType="phone-pad"
                error={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : undefined
                }
              />
            )}

            {/* Password Input */}
            <Input
              label={t("auth.password")}
              placeholder={t("auth.enterPassword")}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              type="password"
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
            />

            {/* Remember Me & Forgot Password */}
            <View
              className={`flex-row justify-between items-center mt-4 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
            >
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center"
              >
                <View
                  className={`w-5 h-5 border-2 rounded mr-2 items-center justify-center ${rememberMe ? "border-secondary" : ""}`}
                // style={{
                //   borderColor: rememberMe ? colors.tint : (theme === 'dark' ? '#4B5563' : '#D1D5DB'),
                //   backgroundColor: rememberMe ? colors.tint : "transparent",
                // }}
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                <Text
                  style={{
                    fontFamily: "Cairo_400Regular",
                    color: colors.light.text
                  }}
                >
                  {t("auth.rememberMe")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { }}>
                <Text className="font-medium" style={{ color: colors.light.tint }}>
                  {t("auth.forgotPassword")}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <View className="mt-8">
              <Button
                title={isLoading ? t("auth.signingIn") : t("auth.signIn")}
                onPress={formik.handleSubmit}
                disabled={
                  isLoading ||
                  !formik.isValid ||
                  !formik.dirty ||
                  (loginMethod === "email" ? !formik.values.email : !formik.values.phone) ||
                  !formik.values.password
                }
              />
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center mt-8 mb-8">
              <Text className="text-black dark:text-white">{t("auth.dontHaveAccount")}</Text>
              <TouchableOpacity onPress={() => router.push("/auth/register")}>
                <Text className="font-semibold ml-1" style={{ color: colors.light.tint }}>
                  {t("auth.signUp")}
                </Text>
              </TouchableOpacity>
            </View>

            {/* <GoogleButton /> */}
          </View>
        </View>
      </AuthLayout>
    </Layout>

  );
}
