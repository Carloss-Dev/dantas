import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { MultiSelect } from "@components/ui/MultiSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  tags: z.array(z.string()).optional(),
});

interface IFormData extends z.infer<typeof formSchema> {}

export const Home = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: IFormData) => {
    console.log("Dados do formulário:", data);
  };

  const handleTagsChange = (selectedTags: string[]) => {
    setValue("tags", selectedTags);
  };

  return (
    <section className="col-span-12 flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-xl font-bold">Formulário de Teste</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-96 flex-col gap-4"
      >
        <Input
          label="Nome"
          type="text"
          id="name"
          register={register}
          errors={errors.name}
          placeholder="Digite seu nome"
          className="w-full"
          {...register("name")}
        />

        {/* Passando a função handleTagsChange como onChange */}
        <MultiSelect
          options={[
            "teste1",
            "teste2",
            "aoba",
            "adasd",
            "asdasasdsad",
            "adihasidhas",
            "aosidhasuiod",
            "aosidhauis",
            "sdugfdsui",
            "asjidhasjkhd",
          ]}
          placeholder="Selecione tags..."
          onChange={handleTagsChange}
        />

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </section>
  );
};
