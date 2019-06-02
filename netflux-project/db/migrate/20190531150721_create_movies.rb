class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :year
      t.string :genre
      t.string :director
      t.string :plot
      t.string :image

      t.timestamps
    end
  end
end
