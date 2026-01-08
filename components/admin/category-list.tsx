// @ts-nocheck
"use client";

/**
 * Lista de Categorias com Drag & Drop e Setas
 * Permite reordenar (drag/setas), editar e excluir categorias
 */

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { Category } from "@/lib/types/category";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CategoryListProps {
  categories: Category[];
}

function SortableCategoryItem({
  category,
  index,
  totalCategories,
  onMoveUp,
  onMoveDown,
  onDelete,
  isDeleting,
}: {
  category: Category;
  index: number;
  totalCategories: number;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDelete: (id: string, nome: string) => void;
  isDeleting: string | null;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 border-b border-border-dark bg-brand-gray-dark px-4 py-3 ${
        isDragging ? "z-50 shadow-lg" : ""
      }`}
    >
      {/* Drag Handle - Smaller touch area */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab select-none touch-none active:cursor-grabbing text-text-muted-dark hover:text-text-secondary-dark p-1"
        style={{
          WebkitUserSelect: 'none',
          userSelect: 'none',
          touchAction: 'none',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="rotate-90"
        >
          <circle cx="7" cy="10" r="1.5" />
          <circle cx="13" cy="10" r="1.5" />
          <circle cx="7" cy="6" r="1.5" />
          <circle cx="13" cy="6" r="1.5" />
          <circle cx="7" cy="14" r="1.5" />
          <circle cx="13" cy="14" r="1.5" />
        </svg>
      </div>

      {/* Arrows */}
      <div className="flex flex-col gap-0.5">
        <button
          onClick={() => onMoveUp(category.id)}
          disabled={index === 0}
          className="text-text-muted-dark hover:text-brand-light disabled:opacity-30 disabled:cursor-not-allowed"
          title="Mover para cima"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={() => onMoveDown(category.id)}
          disabled={index === totalCategories - 1}
          className="text-text-muted-dark hover:text-brand-light disabled:opacity-30 disabled:cursor-not-allowed"
          title="Mover para baixo"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Category Info - Prevent text selection */}
      <div className="flex-1 select-none" style={{ WebkitUserSelect: 'none', userSelect: 'none' }}>
        <p className="font-medium text-text-primary-dark">{category.nome}</p>
        <p className="text-xs text-text-muted-dark">{category.slug}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Edit Button */}
        <Link
          href={`/admin/categorias/${category.id}/editar`}
          className="rounded-md p-2 text-text-secondary-dark transition-colors hover:bg-border-subtle-dark hover:text-brand-light"
          title="Editar"
        >
          <Edit className="h-4 w-4" />
        </Link>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(category.id, category.nome);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isDeleting !== category.id) {
              onDelete(category.id, category.nome);
            }
          }}
          disabled={isDeleting === category.id}
          className="rounded-md p-2 text-text-secondary-dark transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          title="Excluir"
          style={{ touchAction: 'manipulation' }}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function CategoryList({ categories: initialCategories }: CategoryListProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [deleting, setDeleting] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateCategoryOrder = async (updatedCategories: Category[]) => {
    // Update ordem for all categories
    const updates = updatedCategories.map((cat, index) => ({
      id: cat.id,
      ordem: index,
    }));

    for (const update of updates) {
      await supabase
        .from("categorias")
        .update({ ordem: update.ordem })
        .eq("id", update.id);
    }

    router.refresh();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);

      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories);
      updateCategoryOrder(newCategories);
    }
  };

  const handleMoveUp = async (id: string) => {
    const index = categories.findIndex((cat) => cat.id === id);
    if (index === 0) return;

    const newCategories = arrayMove(categories, index, index - 1);
    setCategories(newCategories);
    updateCategoryOrder(newCategories);
  };

  const handleMoveDown = async (id: string) => {
    const index = categories.findIndex((cat) => cat.id === id);
    if (index === categories.length - 1) return;

    const newCategories = arrayMove(categories, index, index + 1);
    setCategories(newCategories);
    updateCategoryOrder(newCategories);
  };

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir a categoria "${nome}"?`)) {
      return;
    }

    setDeleting(id);

    try {
      // Check if there are products associated with this category
      const { data: products, error: checkError } = await supabase
        .from("produtos")
        .select("id")
        .eq("categoria_id", id)
        .limit(1);

      if (checkError) throw checkError;

      if (products && products.length > 0) {
        alert(
          "Não é possível excluir esta categoria porque existem produtos associados a ela."
        );
        setDeleting(null);
        return;
      }

      // Delete category
      const { error: deleteError } = await supabase
        .from("categorias")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Update local state and reorder
      const newCategories = categories.filter((c) => c.id !== id);
      setCategories(newCategories);
      updateCategoryOrder(newCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Erro ao excluir categoria. Tente novamente.");
    } finally {
      setDeleting(null);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="rounded-lg border border-border-subtle-dark bg-brand-gray-dark p-12 text-center">
        <p className="text-text-muted-dark">
          Nenhuma categoria cadastrada. Crie sua primeira categoria!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle-dark bg-brand-gray-dark">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map((cat) => cat.id)}
          strategy={verticalListSortingStrategy}
        >
          {categories.map((category, index) => (
            <SortableCategoryItem
              key={category.id}
              category={category}
              index={index}
              totalCategories={categories.length}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onDelete={handleDelete}
              isDeleting={deleting}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
