import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import tw from "twrnc";

import Button from "../../../components/button";
import { getTokenValidDays } from "../../../services/calls";
import Input from "../../../components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";

const Valid = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [days, setDays] = useState("");

  const initialValues = {
    token: "",
  };
  const validationSchema = Yup.object().shape({
    token: Yup.number().min(8).required("Token number is required!"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    getFieldProps,
  } = formik;

  const handleSubmit = async () => {
    setLoading(true);
    setLoadError("");
    const res = await getTokenValidDays(values.token);
    if (res.success) {
      console.log(res);
      setLoading(false);
      setDays(res.days);
    }
    if (!res.success) {
      setLoading(false);
      setLoadError(res.message);
    }
  };

  return (
    <View style={tw`h-[100%] bg-white  justify-end items-center`}>
      <View
        style={tw`flex flex-row justify-around w-[60] m-auto mb-6 mt-8 items-center`}
      >
        <Pressable onPress={() => navigation.navigate("Buy")}>
          <View style={tw`mt-4 rounded-sm bg-blue-400 p-2 w-[20]`}>
            <Text style={tw`text-xl text-white text-center`}>Buy</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Token")}>
          <View style={tw`mt-4 rounded-sm bg-blue-400 p-2 w-[20] text-center`}>
            <Text style={tw`text-xl text-white text-center `}>Tokens</Text>
          </View>
        </Pressable>
      </View>
      <View style={tw`h-[85%] w-full bg-white `}>
        <View style={tw`w-full`}>
          <Text style={tw`text-center font-extrabold text-xl`}>Welcome to</Text>
          <Text style={tw`text-center font-extrabold text-xl`}>
            BuyElectricity System
          </Text>
        </View>
        <View style={tw`mt-4`}>
          <Text style={tw`text-center text-lg`}>
            Check your token valid days
          </Text>
        </View>
        {loadError.length > 0 && (
          <Text style={tw`mt-4 text-red-500 text-center`}>{loadError}</Text>
        )}
        <View style={tw`mt-8`}>
          <View style={tw`px-6 py-2`}>
            <View style={tw`mt-4`}></View>
            <Input
              Icon={<Feather name="feather" size={24} color="silver" />}
              placeholder="Your Token"
              onChangeText={handleChange("token")}
              onBlur={handleBlur("token")}
              value={values.token}
              borderColor={touched.token && errors.token ? "red" : "gray"}
            />
            {touched.token && errors.token && (
              <Text style={tw`text-red-500`}>{errors.token}</Text>
            )}
            <View style={tw`mt-8`}>
              <Button
                mode={"contained"}
                style={tw`bg-[#193074] w-full p-[10] mt-4`}
                onPress={handleSubmit}
              >
                {loading ? "Checking ..." : "Check"}
              </Button>
              {days !== "" && loadError.length == 0 && (
                <View style={tw`mt-3 mb`}>
                  <Text>Remaining Lighting days: {days}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Valid;
