class CreateJoinTableMoviesSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_join_table :movies, :subscriptions do |t|
      t.index [:movie_id, :subscription_id]
      t.index [:subscription_id, :movie_id]
    end
  end
end
