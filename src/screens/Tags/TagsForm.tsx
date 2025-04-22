import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { useTags } from "@contexts/Tags.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ITag, tagsSchema } from "@schemas/tags.schema";
import { useForm } from "react-hook-form";

const TagsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITag>({
    resolver: zodResolver(tagsSchema),
  });

  const { onSubmit } = useTags();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-4"
    >
      <div className="flex w-96 flex-col">
        <Input
          label="Tag"
          type="text"
          id="tag"
          required
          register={register}
          errors={errors?.tag}
          placeholder="Digite a Tag"
          className="w-full"
          {...register("tag")}
        />
      </div>

      <Button type="submit" className="mt-6 h-10 w-60 self-end">
        Cadastrar
      </Button>
    </form>
  );
};

export default TagsForm;
