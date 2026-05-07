import { createClassAction } from "@/app/dashboard/classes/actions";

export function CreateClassForm() {
  return (
    <form action={createClassAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-extrabold text-foreground mb-2">Class name</label>
        <input
          id="name"
          name="name"
          required
          minLength={3}
          maxLength={80}
          placeholder="Mrs. Rivera - Grade 4"
          className="w-full rounded-2xl border-2 border-border-warm bg-background px-4 py-3 font-semibold outline-none focus:border-warm-coral"
        />
      </div>
      <div>
        <label htmlFor="gradeBand" className="block text-sm font-extrabold text-foreground mb-2">Grade band</label>
        <select id="gradeBand" name="gradeBand" defaultValue="3-5" className="w-full rounded-2xl border-2 border-border-warm bg-background px-4 py-3 font-semibold outline-none focus:border-warm-coral">
          <option value="K-2">K–2</option>
          <option value="3-5">3–5</option>
          <option value="6-8">6–8</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>
      <button type="submit" className="w-full rounded-2xl bg-warm-coral text-white py-4 font-extrabold text-lg shadow-xl shadow-warm-coral/20 btn-playful">
        Create class + code
      </button>
    </form>
  );
}
