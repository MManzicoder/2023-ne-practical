import React, { useEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import tw from "twrnc";
import Input from "../../../components/input";
import { MaterialIcons, Feather } from "@expo/vector-icons";

import { useFormik } from "formik";
import * as Yup from "yup";

import { getTokensByMeter } from "../../../services/calls";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const Token = ({ navigation }) => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const initialValues = {
    meter_number: "",
  };
  const validationSchema = Yup.object().shape({
    meter_number: Yup.number().min(6).required("Meter number is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });
  useEffect(() => {}, []);
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
    const res = await getTokensByMeter(values.meter_number);
    if (res.success) {
      setLoading(false);
      setTokens(res.data);
    }
    if (!res.success) {
      setLoadError(res.message);
    }
  };

  return (
    <View style={tw`h-full flex pt-20 items-center`}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={tw`flex flex-row justify-around w-[60] m-auto mb-6 items-center mt-4`}
          >
            <Pressable onPress={() => navigation.navigate("Buy")}>
              <View style={tw`mt-4 rounded-sm bg-blue-400 p-2 w-[20]`}>
                <Text style={tw`text-xl text-white text-center`}>Buy</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Valid")}>
              <View
                style={tw`mt-4 rounded-sm bg-blue-400 p-2 w-[20] text-center`}
              >
                <Text style={tw`text-xl text-white text-center `}>Valid</Text>
              </View>
            </Pressable>
          </View>
          <View>
            <Text style={tw`text-center font-extrabold text-xl`}>
              Welcome to
            </Text>
            <Text style={tw`text-center font-extrabold text-xl`}>
              BuyElectricity System
            </Text>

            <View style={tw`mt-4`}>
              <Text style={tw`mt-4 text-xl text-center`}>
                Get all tokens on meter number
              </Text>
            </View>
            <View style={tw`mt-4`}>
              <Input
                Icon={<Feather name="feather" size={24} color="silver" />}
                placeholder="Your Meter number"
                onChangeText={handleChange("meter_number")}
                onBlur={handleBlur("meter_number")}
                value={values.meter_number}
                borderColor={
                  touched.meter_number && errors.meter_number ? "red" : "gray"
                }
              />
              {touched.meter_number && errors.meter_number && (
                <Text style={tw`text-red-500`}>{errors.meter_number}</Text>
              )}
              <View style={`mt-4`}>
                <Button
                  mode={"contained"}
                  style={tw`bg-[#193074] text-white w-full p-[10] mt-4`}
                  onPress={handleSubmit}
                  //   disabled={!isValid || loading}
                >
                  {loading ? "Loading ..." : "Get All"}
                </Button>
              </View>
            </View>

            {!loading && tokens.length > 0 && (
              <Text style={tw`mt-2`}>
                All tokens on meter: {values.meter_number}
              </Text>
            )}
            {!loading && tokens.length > 0 ? (
              tokens?.map((el) => (
                <View key={el._id} style={tw` mt-2 mb-4 w-[80]`}>
                  <Card>
                    <Card.Title
                      title={el.token}
                      subtitle={
                        loadError !== "" ? (
                          <Text style={tw`mt-4 text-red-500 text-center`}>
                            {loadError}
                          </Text>
                        ) : (
                          <Text>Token {el.token}</Text>
                        )
                      }
                    />
                    <Card.Content>
                      <Paragraph>Meter number: {el.meter_number}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                      <Paragraph>status: {el.token_status}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                      <Paragraph>
                        Expiration Date:
                        {" " + el.token_expiration_date.toLocaleString()}
                      </Paragraph>
                    </Card.Content>
                    <Card.Content>
                      <Paragraph>
                        Amount:
                        {" " + el?.amount + " Frw"}
                      </Paragraph>
                    </Card.Content>
                  </Card>
                </View>
              ))
            ) : (
              <Text style={tw`mt-4 text-gray-500 text-center`}>
                No tokens found!
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Token;
